"use strict";(self.webpackChunkClientApp=self.webpackChunkClientApp||[]).push([[80],{8080:(ve,T,g)=>{g.r(T),g.d(T,{AccountModule:()=>_e});var d=g(6814),c=g(3377);function x(i,a,t,n,r,o,l){try{var u=i[o](l),m=u.value}catch(_){return void t(_)}u.done?a(m):Promise.resolve(m).then(n,r)}function b(i){return function(){var a=this,t=arguments;return new Promise(function(n,r){var o=i.apply(a,t);function l(m){x(o,n,r,l,u,"next",m)}function u(m){x(o,n,r,l,u,"throw",m)}l(void 0)})}}var e=g(4769),s=g(95),h=g(8180),y=g(6726),f=g(6448),v=g(1782),Z=g(1322);const A=["googleButton"];function S(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," First name is requried "),e.qZA())}function B(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," First name must be at least 3, and maximum 15 characters "),e.qZA())}function N(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," Last name is requried "),e.qZA())}function J(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," Last name must be at least 3, and maximum 15 characters "),e.qZA())}function Y(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," Email is requried "),e.qZA())}function E(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," Invalide email address "),e.qZA())}function G(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," Password is requried "),e.qZA())}function M(i,a){1&i&&(e.TgZ(0,"span",26),e._uU(1," Password must be at least 6, and maximum 15 characters "),e.qZA())}function P(i,a){if(1&i&&(e.TgZ(0,"div",27),e._UZ(1,"app-validation-messages",28),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("errorMessages",t.errorMessages)}}let R=(()=>{class i{constructor(t,n,r,o,l,u){this.accounSerivces=t,this.FormBuilder=n,this.sharedService=r,this.router=o,this._renderer2=l,this._document=u,this.googleButton=new e.SBq({}),this.registerFormGroup=new s.cw({}),this.submited=!1,this.errorMessages=[],this.accounSerivces.user$.pipe((0,h.q)(1)).subscribe({next:m=>{m&&this.router.navigateByUrl("/")}})}ngOnInit(){this.initializeGoogleButton(),this.initializeForm()}ngAfterViewInit(){const t=this._renderer2.createElement("script");t.src="https://accounts.google.com/gsi/client",t.async="true",t.defer="true",this._renderer2.appendChild(this._document.body,t)}initializeForm(){this.registerFormGroup=this.FormBuilder.group({firstname:["",[s.kI.required,s.kI.minLength(3),s.kI.maxLength(15)]],lastname:["",[s.kI.required,s.kI.minLength(3),s.kI.maxLength(15)]],email:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required,s.kI.minLength(6),s.kI.maxLength(15)]]})}Register(){this.submited=!0,this.errorMessages=[],this.registerFormGroup.valid&&this.accounSerivces.register(this.registerFormGroup.value).subscribe({next:t=>{this.sharedService.showNotification(!0,t.value.title,t.value.message),this.router.navigateByUrl("/account/login")},error:t=>{console.log(t),t.error.errors?this.errorMessages=t.error.errors:this.errorMessages.push(t.error)}})}RegisterWithFacebook(){var t=this;FB.login(function(){var n=b(function*(r){r.authResponse?(console.log(r),t.router.navigateByUrl(`/account/register/third-party/facebook?access_token=${r.authResponse.accessToken}&userId=${r.authResponse.userID}`)):t.sharedService.showNotification(!1,"Failed","Unable to register with your facebook account")});return function(r){return n.apply(this,arguments)}}())}initializeGoogleButton(){window.onGoogleLibraryLoad=()=>{google.accounts.id.initialize({client_id:"227349503161-pdrcuj8lhp5br97ejfh8pbshbfhc5iuj.apps.googleusercontent.com",callback:this.googleCallBack.bind(this),auto_select:!1,cancel_on_tap_outside:!0}),google.accounts.id.renderButton(this.googleButton.nativeElement,{size:"medium",shape:"rectangular",text:"signup_with",logo_alignment:"center"})}}googleCallBack(t){var n=this;return b(function*(){const r=(0,y.Z)(t.credential);n.router.navigateByUrl(`/account/register/third-party/google?access_token=${t.credential}&userId=${r.sub}`)})()}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(f.B),e.Y36(s.qu),e.Y36(v.F),e.Y36(c.F0),e.Y36(e.Qsj),e.Y36(d.K0))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-register"]],viewQuery:function(n,r){if(1&n&&e.Gf(A,7),2&n){let o;e.iGM(o=e.CRH())&&(r.googleButton=o.first)}},decls:47,vars:18,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-12","col-lg-5"],[1,"form-signin"],["autocomplete","off",3,"formGroup","ngSubmit"],["mb-4","",1,"text-center"],[1,"mb-3","font-weight-normal"],[1,"form-floating","mb-3"],["formControlName","firstname","type","text","placeholder","First name",1,"form-control"],["for","firstname"],["class","text-danger",4,"ngIf"],["formControlName","lastname","type","text","placeholder","Last name",1,"form-control"],["for","lastname"],["formControlName","email","type","email","placeholder","email",1,"form-control"],["for","email"],["formControlName","password","type","password","placeholder","password",1,"form-control"],["for","password"],["class","form-floating",4,"ngIf"],[1,"d-grid","mt-4","px-1"],["type","submit",1,"btn","btn-primary"],[1,"row","d-flex","justify-content-center","mt-3"],[1,"col-3"],[1,"col-4","text-center"],[1,"col-4"],[1,"d-flex","justify-content-between","my-3"],["googleButton",""],[1,"btn","btn-primary","btn-sm",2,"width","180px",3,"click"],[1,"text-danger"],[1,"form-floating"],[3,"errorMessages"]],template:function(n,r){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"main",2)(3,"form",3),e.NdJ("ngSubmit",function(){return r.Register()}),e.TgZ(4,"div",4)(5,"h3",5),e._uU(6,"Register"),e.qZA()(),e.TgZ(7,"div",6),e._UZ(8,"input",7),e.TgZ(9,"label",8),e._uU(10,"First name"),e.qZA(),e.YNc(11,S,2,0,"span",9),e.YNc(12,B,2,0,"span",9),e.qZA(),e.TgZ(13,"div",6),e._UZ(14,"input",10),e.TgZ(15,"label",11),e._uU(16,"Last name"),e.qZA(),e.YNc(17,N,2,0,"span",9),e.YNc(18,J,2,0,"span",9),e.qZA(),e.TgZ(19,"div",6),e._UZ(20,"input",12),e.TgZ(21,"label",13),e._uU(22,"Email"),e.qZA(),e.YNc(23,Y,2,0,"span",9),e.YNc(24,E,2,0,"span",9),e.qZA(),e.TgZ(25,"div",6),e._UZ(26,"input",14),e.TgZ(27,"label",15),e._uU(28,"Password"),e.qZA(),e.YNc(29,G,2,0,"span",9),e.YNc(30,M,2,0,"span",9),e.qZA(),e.YNc(31,P,2,1,"div",16),e.TgZ(32,"div",17)(33,"button",18),e._uU(34,"Create account"),e.qZA()()(),e.TgZ(35,"div",19)(36,"div",20),e._UZ(37,"hr"),e.qZA(),e.TgZ(38,"div",21),e._uU(39,"Or Sign up using "),e.qZA(),e.TgZ(40,"div",22),e._UZ(41,"hr"),e.qZA()(),e.TgZ(42,"div",23),e._UZ(43,"div",null,24),e.TgZ(45,"button",25),e.NdJ("click",function(){return r.RegisterWithFacebook()}),e._uU(46," Sign up with Facebook "),e.qZA()()()()()),2&n){let o,l,u,m,_,p,k,U,q,C,I,w;e.xp6(3),e.Q6J("formGroup",r.registerFormGroup),e.xp6(5),e.ekj("is-invalid",r.submited&&(null==(o=r.registerFormGroup.get("firstname"))?null:o.errors)),e.xp6(3),e.Q6J("ngIf",r.submited&&(null==(l=r.registerFormGroup.get("firstname"))?null:l.hasError("required"))),e.xp6(1),e.Q6J("ngIf",r.submited&&(null==(u=r.registerFormGroup.get("firstname"))?null:u.hasError("minlength"))||(null==(u=r.registerFormGroup.get("firstname"))?null:u.hasError("maxlength"))),e.xp6(2),e.ekj("is-invalid",r.submited&&(null==(m=r.registerFormGroup.get("lastname"))?null:m.errors)),e.xp6(3),e.Q6J("ngIf",r.submited&&(null==(_=r.registerFormGroup.get("lastname"))?null:_.hasError("required"))),e.xp6(1),e.Q6J("ngIf",r.submited&&(null==(p=r.registerFormGroup.get("lastname"))?null:p.hasError("minlength"))||(null==(p=r.registerFormGroup.get("lastname"))?null:p.hasError("maxlength"))),e.xp6(2),e.ekj("is-invalid",r.submited&&(null==(k=r.registerFormGroup.get("email"))?null:k.errors)),e.xp6(3),e.Q6J("ngIf",r.submited&&(null==(U=r.registerFormGroup.get("email"))?null:U.hasError("required"))),e.xp6(1),e.Q6J("ngIf",r.submited&&(null==(q=r.registerFormGroup.get("email"))?null:q.hasError("pattern"))),e.xp6(2),e.ekj("is-invalid",r.submited&&(null==(C=r.registerFormGroup.get("password"))?null:C.errors)),e.xp6(3),e.Q6J("ngIf",r.submited&&(null==(I=r.registerFormGroup.get("password"))?null:I.hasError("required"))),e.xp6(1),e.Q6J("ngIf",r.submited&&(null==(w=r.registerFormGroup.get("password"))?null:w.hasError("minlength"))||(null==(w=r.registerFormGroup.get("password"))?null:w.hasError("maxlength"))),e.xp6(1),e.Q6J("ngIf",r.errorMessages.length>0)}},dependencies:[d.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,Z.s]})}return i})();class F{constructor(a,t,n){this.accessToken=a,this.userId=t,this.provider=n}}const L=["googleButton"];function Q(i,a){1&i&&(e.TgZ(0,"span",24),e._uU(1," User name is requried "),e.qZA())}function j(i,a){1&i&&(e.TgZ(0,"span",24),e._uU(1," password is requried "),e.qZA())}function z(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"a",28),e.NdJ("click",function(){e.CHM(t);const r=e.oxw(2);return e.KtG(r.resendEmailConfirmationLink())}),e._uU(1," click here to resend email confirmation link in case you didn't receve it. "),e.qZA()}}function W(i,a){if(1&i&&(e.TgZ(0,"div",25),e._UZ(1,"app-validation-messages",26),e.YNc(2,z,2,0,"a",27),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("errorMessages",t.errorMessages),e.xp6(1),e.Q6J("ngIf",t.errorMessages[0].includes("Please confirme your email address"))}}let O=(()=>{class i{constructor(t,n,r,o,l,u,m){this.accounSerivces=t,this.formBuilder=n,this.router=r,this.activatedRout=o,this.sharedService=l,this._renderer2=u,this._document=m,this.googleButton=new e.SBq({}),this.loginFormGroup=new s.cw({}),this.submited=!1,this.errorMessages=[],this.returnUrl=null,this.accounSerivces.user$.pipe((0,h.q)(1)).subscribe({next:_=>{_?this.router.navigateByUrl("/"):this.activatedRout.queryParamMap.subscribe({next:p=>{p&&(this.returnUrl=p.returnUrl.get("returnUrl"))}})}})}ngOnInit(){this.initializeGoogleButton(),this.initializeForm()}ngAfterViewInit(){const t=this._renderer2.createElement("script");t.src="https://accounts.google.com/gsi/client",t.async="true",t.defer="true",this._renderer2.appendChild(this._document.body,t)}initializeForm(){this.loginFormGroup=this.formBuilder.group({username:["",s.kI.required],password:["",s.kI.required]})}login(){this.submited=!0,this.errorMessages=[],this.loginFormGroup.valid&&this.accounSerivces.login(this.loginFormGroup.value).subscribe({next:t=>{this.router.navigateByUrl(this.returnUrl?this.returnUrl:"/")},error:t=>{console.log(t),t.error.errors?this.errorMessages=t.error.errors:this.errorMessages.push(t.error)}})}LoginWithFacebook(){var t=this;FB.login(function(){var n=b(function*(r){r.authResponse?(console.log(r),t.accounSerivces.loginWithThirdParty(new F(r.authResponse.accessToken,r.authResponse.userID,"facebook")).subscribe({next:u=>{t.router.navigateByUrl(t.returnUrl?t.returnUrl:"/")},error:u=>{t.sharedService.showNotification(!1,"Failed",u.error)}})):t.sharedService.showNotification(!1,"Failed","Unable to login with your facebook account")});return function(r){return n.apply(this,arguments)}}())}resendEmailConfirmationLink(){this.router.navigateByUrl("/account/send-email/resend-email-confirmation-link")}initializeGoogleButton(){window.onGoogleLibraryLoad=()=>{google.accounts.id.initialize({client_id:"227349503161-pdrcuj8lhp5br97ejfh8pbshbfhc5iuj.apps.googleusercontent.com",callback:this.googleCallBack.bind(this),auto_select:!1,cancel_on_tap_outside:!0}),google.accounts.id.renderButton(this.googleButton.nativeElement,{size:"medium",shape:"rectangular",text:"signin_with",logo_alignment:"center"})}}googleCallBack(t){var n=this;return b(function*(){const r=(0,y.Z)(t.credential);n.accounSerivces.loginWithThirdParty(new F(t.credential,r.sub,"google")).subscribe({next:o=>{n.router.navigateByUrl(n.returnUrl?n.returnUrl:"/")},error:o=>{n.sharedService.showNotification(!1,"Failed",o.error)}})})()}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(f.B),e.Y36(s.qu),e.Y36(c.F0),e.Y36(c.gz),e.Y36(v.F),e.Y36(e.Qsj),e.Y36(d.K0))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-login"]],viewQuery:function(n,r){if(1&n&&e.Gf(L,7),2&n){let o;e.iGM(o=e.CRH())&&(r.googleButton=o.first)}},decls:37,vars:8,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-12","col-lg-5"],[1,"form-signin"],["autocomplete","off",3,"formGroup","ngSubmit"],["mb-4","",1,"text-center"],[1,"mb-3","font-weight-normal"],[1,"form-floating","mb-3"],["formControlName","username","type","email","placeholder","username (your email address)",1,"form-control"],["for","username"],["class","text-danger",4,"ngIf"],["formControlName","password","type","password","placeholder","password",1,"form-control"],["for","password"],["class","form-floating",4,"ngIf"],[1,"d-grid","mt-4","px-1"],["type","submit",1,"btn","btn-primary"],[1,"mt-4","text-center"],["routerLink","/account/send-email/forgot-username-or-password",1,"btn","btn-link"],[1,"row","d-flex","justify-content-center","mt-3"],[1,"col-3"],[1,"col-4","text-center"],[1,"col-4"],[1,"d-flex","justify-content-between","my-3"],["googleButton",""],[1,"btn","btn-primary","btn-sm",2,"width","180px",3,"click"],[1,"text-danger"],[1,"form-floating"],[3,"errorMessages"],["class","btn btn-link",3,"click",4,"ngIf"],[1,"btn","btn-link",3,"click"]],template:function(n,r){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"main",2)(3,"form",3),e.NdJ("ngSubmit",function(){return r.login()}),e.TgZ(4,"div",4)(5,"h3",5),e._uU(6,"login"),e.qZA()(),e.TgZ(7,"div",6),e._UZ(8,"input",7),e.TgZ(9,"label",8),e._uU(10,"username (your email address)"),e.qZA(),e.YNc(11,Q,2,0,"span",9),e.qZA(),e.TgZ(12,"div",6),e._UZ(13,"input",10),e.TgZ(14,"label",11),e._uU(15,"Password"),e.qZA(),e.YNc(16,j,2,0,"span",9),e.qZA(),e.YNc(17,W,3,2,"div",12),e.TgZ(18,"div",13)(19,"button",14),e._uU(20,"Log in"),e.qZA()()(),e.TgZ(21,"div",15)(22,"a",16)(23,"h6"),e._uU(24,"forget username or password"),e.qZA()()(),e.TgZ(25,"div",17)(26,"div",18),e._UZ(27,"hr"),e.qZA(),e.TgZ(28,"div",19),e._uU(29,"Or Sign up using "),e.qZA(),e.TgZ(30,"div",20),e._UZ(31,"hr"),e.qZA()(),e.TgZ(32,"div",21),e._UZ(33,"div",null,22),e.TgZ(35,"button",23),e.NdJ("click",function(){return r.LoginWithFacebook()}),e._uU(36," Sign in with Facebook "),e.qZA()()()()()),2&n){let o,l,u,m;e.xp6(3),e.Q6J("formGroup",r.loginFormGroup),e.xp6(5),e.ekj("is-invalid",r.submited&&(null==(o=r.loginFormGroup.get("username"))?null:o.errors)),e.xp6(3),e.Q6J("ngIf",r.submited&&(null==(l=r.loginFormGroup.get("username"))?null:l.hasError("required"))),e.xp6(2),e.ekj("is-invalid",r.submited&&(null==(u=r.loginFormGroup.get("password"))?null:u.errors)),e.xp6(3),e.Q6J("ngIf",r.submited&&(null==(m=r.loginFormGroup.get("password"))?null:m.hasError("required"))),e.xp6(1),e.Q6J("ngIf",r.errorMessages.length>0)}},dependencies:[d.O5,c.rH,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,Z.s]})}return i})();function H(i,a){1&i&&(e.TgZ(0,"div",1)(1,"a",2),e._uU(2," login "),e.qZA()())}function $(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",1)(1,"a",3),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.resendEmailConfirmationLink())}),e._uU(2," click here to resend email confirmation link "),e.qZA()()}}let K=(()=>{class i{constructor(t,n,r,o){this.accountServics=t,this.sharedService=n,this.router=r,this.activeateRouter=o,this.success=!0}ngOnInit(){this.accountServics.user$.pipe((0,h.q)(1)).subscribe({next:t=>{t?this.router.navigateByUrl("/"):this.activeateRouter.queryParamMap.subscribe({next:n=>{const r={token:n.get("token"),email:n.get("email")};this.accountServics.confirmEmail(r).subscribe({next:o=>{this.sharedService.showNotification(!0,o.value.title,o.value.message)},error:o=>{this.success=!1,this.sharedService.showNotification(!1,"Failed",o.error)}})}})}})}resendEmailConfirmationLink(){this.router.navigateByUrl("/account/send-email/resend-email-confirmation-link")}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(f.B),e.Y36(v.F),e.Y36(c.F0),e.Y36(c.gz))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-confirm-email"]],decls:2,vars:2,consts:[["class","container mt-5",4,"ngIf"],[1,"container","mt-5"],["routerLink","/account/login",1,"btn","btn-primary"],[1,"btn","btn-link",3,"click"]],template:function(n,r){1&n&&(e.YNc(0,H,3,0,"div",0),e.YNc(1,$,3,0,"div",0)),2&n&&(e.Q6J("ngIf",r.success),e.xp6(1),e.Q6J("ngIf",!r.success))},dependencies:[d.O5,c.rH]})}return i})();function X(i,a){1&i&&(e.TgZ(0,"span"),e._uU(1," Resend email confirmation link "),e.qZA())}function D(i,a){1&i&&(e.TgZ(0,"span"),e._uU(1," Reset your username or password "),e.qZA())}function V(i,a){1&i&&(e.TgZ(0,"span",18),e._uU(1," Email is requried "),e.qZA())}function ee(i,a){if(1&i&&(e.TgZ(0,"div",19),e._UZ(1,"app-validation-messages",20),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("errorMessages",t.errorMessage)}}function te(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"main",3)(3,"form",4),e.NdJ("ngSubmit",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.sendEmail())}),e.TgZ(4,"div",5)(5,"h1",6),e.YNc(6,X,2,0,"span",7),e.YNc(7,D,2,0,"span",7),e.qZA()(),e.TgZ(8,"div",8),e._UZ(9,"input",9),e.TgZ(10,"label",10),e._uU(11,"Email"),e.qZA(),e.YNc(12,V,2,0,"span",11),e.qZA(),e.YNc(13,ee,2,1,"div",12),e.TgZ(14,"div",13)(15,"div",14)(16,"div",15)(17,"button",16),e._uU(18,"Send"),e.qZA()()(),e.TgZ(19,"div",14)(20,"div",15)(21,"button",17),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.cancel())}),e._uU(22,"Cancle"),e.qZA()()()()()()()()}if(2&i){const t=e.oxw();let n,r;e.xp6(3),e.Q6J("formGroup",t.emailForm),e.xp6(3),e.Q6J("ngIf",t.mode.includes("resend-email-confirmation-link")),e.xp6(1),e.Q6J("ngIf",t.mode.includes("forgot-username-or-password")),e.xp6(2),e.ekj("is-invalid",t.submited&&(null==(n=t.emailForm.get("email"))?null:n.errors)),e.xp6(3),e.Q6J("ngIf",t.submited&&(null==(r=t.emailForm.get("email"))?null:r.hasError("required"))),e.xp6(1),e.Q6J("ngIf",t.errorMessage.length>0)}}let re=(()=>{class i{constructor(t,n,r,o,l){this.accountService=t,this.sharedService=n,this.formBuilder=r,this.router=o,this.activateRouter=l,this.emailForm=new s.cw({}),this.submited=!1,this.errorMessage=[]}ngOnInit(){this.accountService.user$.pipe((0,h.q)(1)).subscribe({next:t=>{if(t)this.router.navigateByUrl("/");else{const n=this.activateRouter.snapshot.paramMap.get("mode");n&&(this.mode=n,console.log(this.mode),this.intializeForm())}}})}intializeForm(){this.emailForm=this.formBuilder.group({email:["",[s.kI.required,s.kI.email]]})}sendEmail(){this.submited=!0,this.errorMessage=[],this.emailForm.value&&this.mode&&(this.mode.includes("resend-email-confirmation-link")?this.accountService.resendEmailConfirmationLink(this.emailForm.get("email")?.value).subscribe({next:t=>{this.sharedService.showNotification(!0,t.value.title,t.value.message),this.router.navigateByUrl("/account/login")},error:t=>{t.error.errors?this.errorMessage=t.error.errors:this.errorMessage.push(t.error)}}):this.mode.includes("forgot-username-or-password")&&this.accountService.forgotUsernameorPassword(this.emailForm.get("email")?.value).subscribe({next:t=>{this.sharedService.showNotification(!0,t.value.title,t.value.message),this.router.navigateByUrl("/account/login")},error:t=>{t.error.errors?this.errorMessage=t.error.errors:this.errorMessage.push(t.error)}}))}cancel(){this.router.navigateByUrl("/account/login")}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(f.B),e.Y36(v.F),e.Y36(s.qu),e.Y36(c.F0),e.Y36(c.gz))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-send-email"]],decls:1,vars:1,consts:[["class","d-flex justify-content-center",4,"ngIf"],[1,"d-flex","justify-content-center"],[1,"col-12","col-lg-5"],[1,"form-signin"],["autocomplete","off",1,"form-signin",3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-3","font-weight-normal"],[4,"ngIf"],[1,"form-floating","mb-3"],["formControlName","email","type","email","placeholder","email",1,"form-control"],["for","email"],["class","text-danger",4,"ngIf"],["class","form-floating",4,"ngIf"],[1,"row"],[1,"col-6"],[1,"d-grid"],["type","submit",1,"btn","btn-block","btn-success"],["type","submit",1,"btn","btn-block","btn-danger",3,"click"],[1,"text-danger"],[1,"form-floating"],[3,"errorMessages"]],template:function(n,r){1&n&&e.YNc(0,te,23,7,"div",0),2&n&&e.Q6J("ngIf",r.mode)},dependencies:[d.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,Z.s]})}return i})();function ie(i,a){1&i&&(e.TgZ(0,"span",19),e._uU(1," New Password is requried "),e.qZA())}function ne(i,a){1&i&&(e.TgZ(0,"span",19),e._uU(1," New Password must be at least 6, and maximum 15 characters "),e.qZA())}function se(i,a){if(1&i&&(e.TgZ(0,"div",20),e._UZ(1,"app-validation-messages",21),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("errorMessages",t.errorMessage)}}function oe(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"main",3)(3,"form",4),e.NdJ("ngSubmit",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.resetPassword())}),e.TgZ(4,"div",5)(5,"h1",6),e._uU(6," change your password "),e.qZA()(),e.TgZ(7,"div",7),e._UZ(8,"input",8),e.TgZ(9,"label",9),e._uU(10,"Email"),e.qZA()(),e.TgZ(11,"div",7),e._UZ(12,"input",10),e.TgZ(13,"label",11),e._uU(14,"New Password"),e.qZA(),e.YNc(15,ie,2,0,"span",12),e.YNc(16,ne,2,0,"span",12),e.qZA(),e.YNc(17,se,2,1,"div",13),e.TgZ(18,"div",14)(19,"div",15)(20,"div",16)(21,"button",17),e._uU(22,"Change password"),e.qZA()()(),e.TgZ(23,"div",15)(24,"div",16)(25,"button",18),e._uU(26,"Cancle"),e.qZA()()()()()()()()}if(2&i){const t=e.oxw();let n,r,o;e.xp6(3),e.Q6J("formGroup",t.resetPasswordForm),e.xp6(9),e.ekj("is-invalid",t.submited&&(null==(n=t.resetPasswordForm.get("newPassword"))?null:n.errors)),e.xp6(3),e.Q6J("ngIf",t.submited&&(null==(r=t.resetPasswordForm.get("newPassword"))?null:r.hasError("required"))),e.xp6(1),e.Q6J("ngIf",t.submited&&(null==(o=t.resetPasswordForm.get("newPassword"))?null:o.hasError("minlength"))||(null==(o=t.resetPasswordForm.get("newPassword"))?null:o.hasError("maxlength"))),e.xp6(1),e.Q6J("ngIf",t.errorMessage.length>0)}}let ae=(()=>{class i{constructor(t,n,r,o,l){this.accountService=t,this.sharedService=n,this.formBuilder=r,this.router=o,this.activateRouter=l,this.resetPasswordForm=new s.cw({}),this.submited=!1,this.errorMessage=[]}ngOnInit(){this.accountService.user$.pipe((0,h.q)(1)).subscribe({next:t=>{t?this.router.navigateByUrl("/"):this.activateRouter.queryParamMap.subscribe({next:n=>{this.token=n.get("token"),this.email=n.get("email"),this.token&&this.email?this.initializeForm(this.email):this.router.navigateByUrl("/account/login")}})}})}initializeForm(t){this.resetPasswordForm=this.formBuilder.group({email:[{value:t,disabled:!0}],newPassword:["",[s.kI.required,s.kI.minLength(6),s.kI.maxLength(15)]]})}resetPassword(){if(this.submited=!0,this.errorMessage=[],this.resetPasswordForm.valid&&this.email&&this.token){const t={token:this.token,email:this.email,newPassword:this.resetPasswordForm.get("newPassword")?.value};this.accountService.resetPassword(t).subscribe({next:n=>{this.sharedService.showNotification(!0,n.value.title,n.value.message),this.router.navigateByUrl("/account/login")},error:n=>{n.error.errors?this.errorMessage=n.error.errors:this.errorMessage.push(n.error)}})}}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(f.B),e.Y36(v.F),e.Y36(s.qu),e.Y36(c.F0),e.Y36(c.gz))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-reset-password"]],decls:1,vars:1,consts:[["class","d-flex justify-content-center",4,"ngIf"],[1,"d-flex","justify-content-center"],[1,"col-12","col-lg-5"],[1,"form-signin"],["autocomplete","off",1,"form-signin",3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-3","font-weight-normal"],[1,"form-floating","mb-3"],["formControlName","email","type","email","placeholder","email",1,"form-control"],["for","email"],["formControlName","newPassword","type","password","placeholder","New password",1,"form-control"],["for","newPassword"],["class","text-danger",4,"ngIf"],["class","form-floating",4,"ngIf"],[1,"row"],[1,"col-6"],[1,"d-grid"],["type","submit",1,"btn","btn-block","btn-success"],["type","submit","routerLink","/account/login",1,"btn","btn-block","btn-danger"],[1,"text-danger"],[1,"form-floating"],[3,"errorMessages"]],template:function(n,r){1&n&&e.YNc(0,oe,27,6,"div",0),2&n&&e.Q6J("ngIf",r.token&&r.email)},dependencies:[d.O5,c.rH,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,Z.s]})}return i})();class le{constructor(a,t,n,r,o){this.firstName=a,this.lastName=t,this.userId=n,this.accessToken=r,this.provider=o}}function ue(i,a){1&i&&(e.TgZ(0,"span",15),e._uU(1," First name is requried "),e.qZA())}function me(i,a){1&i&&(e.TgZ(0,"span",15),e._uU(1," First name must be at least 3, and maximum 15 characters "),e.qZA())}function ce(i,a){1&i&&(e.TgZ(0,"span",15),e._uU(1," Last name is requried "),e.qZA())}function ge(i,a){1&i&&(e.TgZ(0,"span",15),e._uU(1," Last name must be at least 3, and maximum 15 characters "),e.qZA())}function de(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"main",3)(3,"form",4),e.NdJ("ngSubmit",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.register())}),e.TgZ(4,"div",5)(5,"h3"),e._uU(6," Creating an account using your "),e.TgZ(7,"span",6),e._uU(8),e.ALo(9,"titlecase"),e.qZA()()(),e.TgZ(10,"div",7),e._UZ(11,"input",8),e.TgZ(12,"label",9),e._uU(13,"First name"),e.qZA(),e.YNc(14,ue,2,0,"span",10),e.YNc(15,me,2,0,"span",10),e.qZA(),e.TgZ(16,"div",7),e._UZ(17,"input",11),e.TgZ(18,"label",12),e._uU(19,"Last name"),e.qZA(),e.YNc(20,ce,2,0,"span",10),e.YNc(21,ge,2,0,"span",10),e.qZA(),e.TgZ(22,"div",13)(23,"button",14),e._uU(24,"Create account"),e.qZA()()()()()()}if(2&i){const t=e.oxw();let n,r,o,l,u,m;e.xp6(3),e.Q6J("formGroup",t.registerForm),e.xp6(5),e.Oqu(e.lcZ(9,10,t.provider)),e.xp6(3),e.ekj("is-invalid",t.submitted&&(null==(n=t.registerForm.get("firstname"))?null:n.errors)),e.xp6(3),e.Q6J("ngIf",t.submitted&&(null==(r=t.registerForm.get("firstname"))?null:r.hasError("required"))),e.xp6(1),e.Q6J("ngIf",t.submitted&&(null==(o=t.registerForm.get("firstname"))?null:o.hasError("minlength"))||(null==(o=t.registerForm.get("firstname"))?null:o.hasError("maxlength"))),e.xp6(2),e.ekj("is-invalid",t.submitted&&(null==(l=t.registerForm.get("lastname"))?null:l.errors)),e.xp6(3),e.Q6J("ngIf",t.submitted&&(null==(u=t.registerForm.get("lastname"))?null:u.hasError("required"))),e.xp6(1),e.Q6J("ngIf",t.submitted&&(null==(m=t.registerForm.get("lastname"))?null:m.hasError("minlength"))||(null==(m=t.registerForm.get("lastname"))?null:m.hasError("maxlength")))}}const pe=[{path:"login",component:O},{path:"register",component:R},{path:"confirm-email",component:K},{path:"send-email/:mode",component:re},{path:"reset-password",component:ae},{path:"register/third-party/:provider",component:(()=>{class i{constructor(t,n,r,o){this.accountService=t,this.router=n,this.activateRoute=r,this.formBuilder=o,this.registerForm=new s.cw({}),this.submitted=!1,this.provider=null,this.access_token=null,this.userId=null,this.errerMassage=[]}ngOnInit(){this.accountService.user$.pipe((0,h.q)(1)).subscribe({next:t=>{t?this.router.navigateByUrl("/"):this.activateRoute.queryParamMap.subscribe({next:n=>{this.provider=this.activateRoute.snapshot.paramMap.get("provider"),this.access_token=n.get("access_token"),this.userId=n.get("userId"),this.provider&&this.access_token&&this.userId&&("facebook"===this.provider||"google"===this.provider)?this.initializeFrom():this.router.navigateByUrl("/account/register")}})}})}initializeFrom(){this.registerForm=this.formBuilder.group({firstname:["",[s.kI.required,s.kI.minLength(3),s.kI.maxLength(15)]],lastname:["",[s.kI.required,s.kI.minLength(3),s.kI.maxLength(15)]]})}register(){if(this.submitted=!0,this.errerMassage=[],this.registerForm.valid&&this.userId&&this.access_token&&this.provider){const t=this.registerForm.get("firstname")?.value,n=this.registerForm.get("lastname")?.value,r=new le(t,n,this.userId,this.access_token,this.provider);this.accountService.registerWithThirdParty(r).subscribe({next:o=>{this.router.navigateByUrl("/")},error:o=>{o.error.errors?this.errerMassage=o.error.errors:this.errerMassage.push(o.error)}})}}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(f.B),e.Y36(c.F0),e.Y36(c.gz),e.Y36(s.qu))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-register-with-third-party"]],decls:1,vars:1,consts:[["class","d-flex justify-content-center mt-5",4,"ngIf"],[1,"d-flex","justify-content-center","mt-5"],[1,"col-12","col-lg-5"],[1,"form-signin"],["autocomplete","off",3,"formGroup","ngSubmit"],["mb-4","",1,"text-center"],[1,"text-warning"],[1,"form-floating","mb-3"],["formControlName","firstname","type","text","placeholder","First name",1,"form-control"],["for","firstname"],["class","text-danger",4,"ngIf"],["formControlName","lastname","type","text","placeholder","Last name",1,"form-control"],["for","lastname"],[1,"d-grid","mt-4","px-1"],["type","submit",1,"btn","btn-primary"],[1,"text-danger"]],template:function(n,r){1&n&&e.YNc(0,de,25,12,"div",0),2&n&&e.Q6J("ngIf",r.provider&&r.access_token&&r.userId)},dependencies:[d.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,d.rS]})}return i})()}];let he=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275mod=e.oAB({type:i});static#r=this.\u0275inj=e.cJS({imports:[d.ez,c.Bz.forChild(pe),c.Bz]})}return i})();var fe=g(6208);let _e=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275mod=e.oAB({type:i});static#r=this.\u0275inj=e.cJS({imports:[d.ez,he,fe.m]})}return i})()}}]);