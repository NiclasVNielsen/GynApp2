<template>
    <div class="login">
        <div>
            <h1>
                Login
            </h1>
            <form @submit.prevent="Login">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" placeholder="Email" v-model="email">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" v-model="password">
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
    <a href="/home">
        Homepage
    </a>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import { useRouter } from "vue-router";
export default{
    setup() {
        const router = useRouter()

        const email = ref('')
        const password = ref('')
        const Login = () => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value)
                .catch(err => alert(err.message))
        }
        //Nope you don't belong here check
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                window.location.href = '/home'
                //This is bugged right now
                //router.push("createsymptom");
            }
        });
        return {
            Login,
            email,
            password
        } 
    }
}
</script>