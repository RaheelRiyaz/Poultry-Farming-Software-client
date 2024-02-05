export class LoginRequest {
  userName!: string;
  password!: string;
}

export class LoginResponse {
  userName!: string;
  token!: string;
}

export class SignupRequest extends LoginRequest {
  contactNo!: string;
  email!: string;
}

export class UserInfo {
  userName!: string;
  email!: string;
  contactNo!: string;
}

export class SignupResponse extends UserInfo {
  id!: string;
}

export class ChangePasswordRequest {
  oldPassword!: string;
  newPassword!: string;
}
