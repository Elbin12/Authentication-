import Cookie from 'js-cookie';


const RemoveCookie = (cookiename)=>{
    return Cookie.remove(cookiename, { path: '/' });
};

export default RemoveCookie;