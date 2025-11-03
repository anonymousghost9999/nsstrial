"use client";

// CAS Login - redirects directly to CAS with frontend callback as service
export function login(returnPath?: string) {
    const frontendUrl = window.location.origin;
    const callbackUrl = `${frontendUrl}/api/auth/callback`;
    const casLoginUrl = `https://login.iiit.ac.in/cas/login?service=${encodeURIComponent(callbackUrl)}`;
    
    // Store return path in sessionStorage to redirect after login
    if (returnPath) {
        sessionStorage.setItem('cas_return_path', returnPath);
    } else {
        sessionStorage.setItem('cas_return_path', window.location.pathname);
    }
    
    window.location.replace(casLoginUrl);
}

// CAS Logout - clears all cookies and redirects to CAS logout
export function logout() {
    // Clear all cookies
    const cookies = document.cookie.split(";");
    
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        
        // Delete cookie for all possible paths and domains
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
    }
    
    // Redirect to CAS logout
    window.location.replace("https://login.iiit.ac.in/cas/logout");
}

// Get user data from cookies
export function getUserData() {
    const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };
    
    const uid = getCookie('uid');
    const email = getCookie('email');
    const name = getCookie('name');
    
    if (!uid) return null;
    
    return {
        uid,
        email: email || '',
        name: name || '',
    };
}