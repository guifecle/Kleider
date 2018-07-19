import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticateProvider extends BaseProvider {

  constructor(
    public auth: AngularFireAuth,
  ) {
    super()
    console.log('Hello AuthenticateProvider Provider');
  }

  createAuthUser(user: { email: string, password: string }): Promise<AngularFireAuth> {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password).catch(this.handlePromiseError)
  }

  signInWithEmail(user: { email: string, password: string }): Promise<boolean> {
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authState: any) => {
        return authState != null;
      }).catch(this.handlePromiseError)
  }
  logout(): Promise<void> {
    return this.auth.auth.signOut();
  }
  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.authState.first().subscribe((authState: any) => {
        authState ? resolve(true) : reject(false);
      });
    });
  }

}
