<script>
    import { auth } from '$lib/firebase';
    import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
    import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

    const db = getFirestore();

    // Variables generales
    let email = '';
    let password = '';
    let message = '';
    let isLoggedIn = false;
    let userRole = ''; // 'admin' o 'user'

    // Vista actual (slogan, admin-login, user-login, user-register, user-verify, admin-panel)
    let view = 'slogan';

    // Función para iniciar sesión
    async function login() {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userEmail = userCredential.user.email;

            // Verificar el rol en Firestore
            const docRef = doc(db, 'roles', userEmail);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                userRole = docSnap.data().role;
                isLoggedIn = true;
                view = userRole === 'admin' ? 'admin-panel' : 'user-verify';
                message = `Bienvenido, ${userRole === 'admin' ? 'Administrador' : 'Usuario'}`;
            } else {
                message = 'Error: No se encontró el rol del usuario.';
            }
        } catch (error) {
            message = `Error: ${error.message}`;
        }
    }

    // Función para registrar un nuevo usuario
    async function registerUser() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userEmail = userCredential.user.email;

            // Asignar rol "usuario" al nuevo registro
            await setDoc(doc(db, 'roles', userEmail), { role: 'user' });

            isLoggedIn = true;
            view = 'user-verify'; // Ir directamente a la verificación
            message = `Usuario registrado correctamente: ${userEmail}`;
        } catch (error) {
            message = `Error: ${error.message}`;
        }
    }

    // Función para cerrar sesión
    async function logout() {
        try {
            await signOut(auth);
            isLoggedIn = false;
            userRole = '';
            view = 'slogan';
            message = '';
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    }
</script>

<div class="container flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
    <div class="content bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <!-- Navbar dinámico -->
        <nav class="navbar bg-white w-full p-4 rounded-lg shadow-md flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-700">CertiDocs</h1>
            <div>
                {#if !isLoggedIn}
                    <button
                        on:click={() => (view = 'admin-login')}
                        class="btn btn-blue"
                    >
                        Administrador
                    </button>
                    <button
                        on:click={() => (view = 'user-login')}
                        class="btn btn-green"
                    >
                        Usuario
                    </button>
                    <button
                        on:click={() => (view = 'slogan')}
                        class="btn btn-gray"
                    >
                        Inicio
                    </button>
                {:else}
                    <button
                        on:click={logout}
                        class="btn btn-red"
                    >
                        Cerrar Sesión
                    </button>
                {/if}
            </div>
        </nav>

        <!-- Vistas según el estado del usuario -->
        <div>
            {#if view === 'slogan'}
                <div class="text-center">
                    <h2 class="text-3xl font-bold mb-4 text-gray-700">Bienvenido a CertiDocs</h2>
                    <p class="text-lg text-gray-600 mb-6">
                        Gestiona y verifica documentos académicos con seguridad y confianza.
                    </p>
                    <button
                        on:click={() => (view = 'admin-login')}
                        class="btn btn-blue"
                    >
                        Empezar como Administrador
                    </button>
                </div>
            {:else if view === 'admin-login'}
                <div>
                    <h2 class="text-2xl font-bold mb-4 text-gray-700">Login Administrador</h2>
                    <input
                        type="email"
                        bind:value={email}
                        placeholder="Correo Electrónico"
                        class="input"
                    />
                    <input
                        type="password"
                        bind:value={password}
                        placeholder="Contraseña"
                        class="input"
                    />
                    <button
                        on:click={login}
                        class="btn btn-blue w-full"
                    >
                        Iniciar Sesión
                    </button>
                    <p class="mt-4 text-blue-500">{message}</p>
                </div>
            {:else if view === 'user-login'}
                <div>
                    <h2 class="text-2xl font-bold mb-4 text-gray-700">Login Usuario</h2>
                    <input
                        type="email"
                        bind:value={email}
                        placeholder="Correo Electrónico"
                        class="input"
                    />
                    <input
                        type="password"
                        bind:value={password}
                        placeholder="Contraseña"
                        class="input"
                    />
                    <button
                        on:click={login}
                        class="btn btn-green w-full"
                    >
                        Iniciar Sesión
                    </button>
                    <p class="mt-4 text-green-500">{message}</p>
                    <button
                        on:click={() => (view = 'user-register')}
                        class="btn btn-gray w-full mt-4"
                    >
                        Registrarse
                    </button>
                </div>
            {:else if view === 'user-register'}
                <div>
                    <h2 class="text-2xl font-bold mb-4 text-gray-700">Registrar Nuevo Usuario</h2>
                    <input
                        type="email"
                        bind:value={email}
                        placeholder="Correo Electrónico"
                        class="input"
                    />
                    <input
                        type="password"
                        bind:value={password}
                        placeholder="Contraseña"
                        class="input"
                    />
                    <button
                        on:click={registerUser}
                        class="btn btn-green w-full"
                    >
                        Crear Cuenta
                    </button>
                    <p class="mt-4 text-green-500">{message}</p>
                </div>
            {:else if view === 'user-verify'}
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-4 text-gray-700">Verificación de Certificados</h2>
                    <p class="text-gray-600">Bienvenido al sistema. Aquí puedes verificar tus certificados.</p>
                </div>
            {:else if view === 'admin-panel'}
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-4 text-gray-700">Panel del Administrador</h2>
                    <p class="text-gray-600">Acceso exclusivo para la gestión de certificados.</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Contenedor general centrado */
    .container {
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh; /* Altura completa de la pantalla */
    }

    /* Botones */
    .btn {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-blue {
        background-color: #2563eb;
        color: #ffffff;
    }

    .btn-blue:hover {
        background-color: #1d4ed8;
    }

    .btn-green {
        background-color: #10b981;
        color: #ffffff;
    }

    .btn-green:hover {
        background-color: #059669;
    }

    .btn-gray {
        background-color: #6b7280;
        color: #ffffff;
    }

    .btn-gray:hover {
        background-color: #4b5563;
    }

    .btn-red {
        background-color: #dc2626;
        color: #ffffff;
    }

    .btn-red:hover {
        background-color: #b91c1c;
    }

    /* Inputs */
    .input {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
    }

    /* Div de contenido */
    .content {
        background-color: #ffffff;
    }
</style>
