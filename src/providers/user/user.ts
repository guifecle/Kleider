//Angular Core
import { Injectable, Inject } from '@angular/core';
//Handle Error
import { BaseProvider } from '../base/base';
//Angular FireBase
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
//Observale
import { Observable } from '../../../node_modules/rxjs';
//Models
import { User } from '../../models/user.models';

@Injectable()
export class UserProvider extends BaseProvider {

  //Path
  private PATH_USERS = 'users/';
  //Observables
  public currentUser$: Observable<any>;
  private users$: Observable<any>;
  //User Variables
  public currentUser: any;
  public users: any;
  public key: string;

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
  ) {
    super();

    this.listenAuthState();
  }


  private setUsers(): void {
    this.users$ = this.db.list(this.PATH_USERS, ref => ref.orderByChild('name')).snapshotChanges().map(users => {
      let filteredUsers = users.filter((user => { return user.key !== this.key }));
      return filteredUsers.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  }

  public listenAuthState(): void {
    this.auth.authState.subscribe((authState: any) => {
      if (authState) {
        this.key = authState.uid;
        this.currentUser$ = this.db.object(this.PATH_USERS + authState.uid).snapshotChanges()
          .map(c => {
            return { key: c.key, ...c.payload.val() };
          });
          console.log(this.currentUser)
        this.setUsers();
      }
    })
  }

  private getAll(): Observable<any> {
    return this.db.list(this.PATH_USERS, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
  private get(key: string): Observable<any> {
    return this.db.object(this.PATH_USERS + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
  public create(user: User, uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.object(this.PATH_USERS + uuid)
        .set(user)
        .then(() => resolve())
        .catch(() => reject())
    })
  }
  public userExists(username: string): Observable<boolean> {
    return this.db.list(this.PATH_USERS, ref => ref.orderByChild('name').equalTo(username))
      .snapshotChanges().map((users: any[]) => {
        return users.length > 0;
      }).catch(this.handleObservableError);
  }
  public remove(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (key) {
        return this.db.list(this.PATH_USERS)
          .remove(key)
          .then(() => resolve())
          .catch((error) => reject(error));
      } else {
        reject();
      }
    })
  }
  public editUsers(key: string, user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (key) {
        this.db.list(this.PATH_USERS)
          .update(key, user)
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        reject();
      }
    })
  }
  // uploadFile(file: File, key: string = ''): firebase.storage.UploadTask {
  //   return this.firebaseApp
  //     .storage()
  //     .ref()
  //     .child(`users/${this.key}`)
  //     .put(file)
  // }

}
