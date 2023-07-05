export interface User {
    name: string;
    email: string;
    phone_number: string;
    password: string;
  }

export interface UserLogin {
    phone_number: string;
    password: string;
  }
  
 export interface UserId {
    id: string;
}

export interface Payments {
  map: any;
  payments: Payment;
}

export interface Payment {
  id: string;
  image: string;
  payment_method_name: string;
  fee_structure: string;
  payment_method_type: string;
}