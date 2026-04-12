'use server'

import { cookies } from "next/headers"

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password') as string;

  const CORRECT_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123Asmetavotos2026!';

  if (!password) {
    return { error: "Debe ingresar una contraseña." };
  }

  if (password !== CORRECT_PASSWORD) {
    return { error: "Contraseña incorrecta. Acceso denegado." };
  }

  const cookieStore = await cookies();

  cookieStore.set('admin_session', 'true', { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2
    
  });

  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  
  cookieStore.set('admin_session', '', {
    maxAge: 0,
    path: '/'
  });
}