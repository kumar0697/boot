import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class DataService {
    baseUrl = this.utilitiesService.getApiUrl() ;
    customersBaseUrl = this.baseUrl + '/api/customers';
    ordersBaseUrl = this.baseUrl + '/api/orders';
    orders : IOrder[] = [];
    states : IState[] = [];

constructor(private http : HttpClient, private utilitiesService : UtilitiesService) { }

getCustomerPage(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
    return this.http.get <ICustomer[]>(
        `${this.customersBaseUrl}/page/${page}/${pageSize}`,
        {observe: 'reponse'})
        .pipe(
            map(res => {
                const xInlineCount = res.headesrs.get('X-InlineCount');
                const totalRecords = Number(xInlineCount);
                const customers = res.body as ICustomer[];
                this.calculateCustomersOrderTotal(customers);
                return{
                    results : customers,
                    totalRecords: totalRecords
                };
            }),
            catchError(this.handleError)
        );
}

getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customersBaseUrl)
         .pipe(
             map(customers => {
                 this.calculateCustomerOrderTotal(customers);
                 return customers;
             }),
             catchError(this.handleError)
         );
}

getCustomer(id: number):Observable<ICustomer> {
    return this.http.get<ICustomer>(this.customersBaseUrl + '/' + id)
        .pipe(
            map( customer => {
                this.calculateCustomersOrderTotal([customer]);
                return customer;
            }),
            catchError(this.handleError)
        );
}

insertCustomer(customer : ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.customersBaseUrl,customer)
    .pipe(catchError(this.handleError));
        
}

updateCustomer(customer: ICustomer): Observable<boolean> {
    return this.http.put <IApiResponse>(this.customersBaseUrl + '/' + customer.id, customer)
    .pipe (
        map( res => res.status),
        catchError(this.handleError)
    );
}

deleteCustomer(id : number): Observable<boolean> {
    return this.http.delete<IApiResponse>(this.customersBaseUrl + '/' + id)
        .pipe (
            map(res => res.status),
            catchError(this.handleError)
        );
}


private handleError(error: HttpErrorResponse){
    console.error('server error: ',error);
    if( error.error instanceof Error) {
        const errMessage = error.error.message;
        return throwError(() => errMessage);
    }

    return throwError (() => error || ' Node.js server error');
}

calculateCustomersOrdersTotal(customer: ICustomer[]) {
    for (const customer of customers) {
        if( customer && customers) {
            let total = 0 ;
            for (const order of customer.orders){
                total += order.itemCost;
            }
            customer.orderTotal = total;
        }
    }
}

}
