import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
               { id: 2, username: 'pippo2', password: 'pippo12', firstName: 'pi2', lastName: 'pa2' },
			   { id: 3, username: 'pippo3', password: 'pippo13', firstName: 'pi3', lastName: 'pa3' },
			   { id: 4, username: 'pippo4', password: 'pippo14', firstName: 'pi4', lastName: 'pa4' },
			   { id: 5, username: 'pippo5', password: 'pippo15', firstName: 'pi5', lastName: 'pa5' },
			   { id: 6, username: 'pippo6', password: 'pippo16', firstName: 'pi6', lastName: 'pa6' },
			   { id: 7, username: 'pippo7', password: 'pippo17', firstName: 'pi7', lastName: 'pa7' },
			   { id: 8, username: 'pippo8', password: 'pippo18', firstName: 'pi8', lastName: 'pa8' }
			   
			  ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/all') && method === 'GET':
                        return getAll();     
                case url.endsWith('/auth/signin') && method === 'POST':
                        return getLogin();     
                case url.endsWith('/auth/signout') && method === 'POST':
                        return getLogout();    
                case url.endsWith('/test/user') && method === 'GET':
                        return getUsers();                                                 
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            //if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getAll() {
            
            return ok("ficooooo");
        }

        function getLogin() {
            
            return ok({"id":4,"username":"vale","email":"va@tin.it","roles":["ROLE_USER"]});
        }

        function getLogout() {
            
            return ok("{\"message\":\"You've been signed out!\"}");
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};