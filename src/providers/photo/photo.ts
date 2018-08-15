//Angular Core
import { Injectable, Inject } from '@angular/core';
//Angular FireBase
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Injectable()
export class PhotoProvider {

 
  private PATH_INSTRUCTION = 'instruction/';
  public key: string;
  public currentUser: any;
  constructor(
    private db: AngularFireDatabase,
  ) {

  }

  public takePhoto(key:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH_INSTRUCTION)
        .set(key,{takePhoto: true})
        .then(() => resolve())
    })
  }


}
