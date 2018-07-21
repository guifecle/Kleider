//Angular Core
import { Injectable, Inject } from '@angular/core';
//Handle Error
import { BaseProvider } from '../base/base';
//Angular FireBase
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { FirebaseApp } from '../../../node_modules/angularfire2';
//Observale
import { Observable } from '../../../node_modules/rxjs';
//Models
import { User } from '../../models/user.models';

@Injectable()
export class UserProvider extends BaseProvider {

  private PATH_USERS = 'users/';
  users: any;
  user: any;
  key: string;
  public currentUser: any;
  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    @Inject(FirebaseApp) private firebaseApp: any
  ) {
    super();
  
    this.listenAuthState();
  }

  public getCurrentUserKey(): string {
    return this.key;
  }
  private setUsers(): void {
    this.users = this.db.list(this.PATH_USERS, ref => ref.orderByChild('name')).snapshotChanges().map(users => {
      let filteredUsers = users.filter((user => { return user.key !== this.key }));
      return filteredUsers.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  }
  public getUsers() {
    return this.users;
  }
  public listenAuthState(): void {
    this.auth.authState.subscribe((authState: any) => {
      if (authState) {
        this.key = authState.uid;
        this.currentUser = this.db.object(this.PATH_USERS + authState.uid);
        this.setUsers();
      }
    })
  }

  public getAll(): Observable<any> {
    return this.db.list(this.PATH_USERS, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
  public get(key: string): Observable<any> {
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
