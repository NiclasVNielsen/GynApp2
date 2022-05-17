<template>
    <div class="login">
        <div>
            <h1>
                Sign up
            </h1>
            <form @submit.prevent="Signup">
                <div>
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" v-model="email">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" v-model="password">
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from '@/main.js'
import { ref } from 'vue'
export default{
    setup(){
        const email = ref('')
        const password = ref('')
        const Signup = () => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value)
              .then((userCredential) => {
                const user = userCredential.user;
                userId.value = user.uid
                createUser(userId.value)
              })
              .catch((error) => {
                console.error('Error code: ', error.code);
                console.error('Error message: ', error.message);
              });
        }
        return { email, password, Signup }
    }
}
</script>