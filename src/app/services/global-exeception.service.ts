import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(){
    console.log("hitted");
  }
  handleError(error: any): void {
    // Log the error or perform other actions
    alert(error);
    console.error('Global Error Handler:', error);

    // You can add additional logic here, such as displaying a user-friendly error message

    // Optionally, rethrow the error if needed
    // throw error;
  }
}
