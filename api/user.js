class User {
  constructor( username, password, id ) {
    this.username = username;
    this.password = password;
    this.id = id;
    this.friendlist = [];
  }
  login_confirm( username, password ) {
    if ( username === this.username && password === this.password )
      return true;
    return false;
  }
  checkName( username ) {
    if ( username === this.username )
      return false;
    return true;
  }
}

class UserData {
  constructor() {
    this.userData = [];
  }
  signup( username, password ) {
    this.userData.push( new User( username, password, this.userData.length ) );
  }
  login( username, password ) {
    for ( let i = 0; i < this.userData.length; i += 1 )
      if ( this.userData[ i ].login_confirm( username, password ) )
        return { id: i, friendlist: this.userData[ i ].friendlist };
    return { id: undefined };
  }
  checkName( value ) {
    for ( let i = 0; i < this.userData.length; i += 1 )
      if ( !this.userData[ i ].checkName( value ) )
        return false;
    return true;
  }
}

const userdata = new UserData();

export default userdata;
