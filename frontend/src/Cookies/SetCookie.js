import Cookie from 'js-cookie';

const SetCookie = (cookiename, userinfo)=>{
    Cookie.set(cookiename, userinfo,{
        expires:1,
        sameSite:'strict',
        path:'/'
    });
}

export default SetCookie;