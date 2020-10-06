export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  addressId: number;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  roles: [];
}
