class User {
  constructor({userName, email,firstName,lastName,birthDate,address,token,role,isVerified,avatar}) {
    this.UserName= userName;
    this.Email= email;
    this.FirstName=firstName;
    this.LastName= lastName;
    this.BirthDate = birthDate;
    this.Address = address;
    this.Token= token;
    this.Role= role;
    this.IsVerified = isVerified;
    this.Avatar = avatar;
  }
  
}

export default User;