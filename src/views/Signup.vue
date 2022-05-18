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
            <button @click="signInWithGoogle">Sign ip with Google</button>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUser } from '../main'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import firebase from 'firebase/compat/app'
export default{
    setup(){
        const email = ref('')
        const password = ref('')
        const uid = ref('')

        const router = useRouter()

        const Signup = () => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value)
              .then((userCredential) => {
                const user = userCredential.user;
                uid.value = user.uid
                createUser(uid.value)
              })
              .catch((error) => {
                console.error('Error code: ', error.code);
                console.error('Error message: ', error.message);
              });
        }

        const signInWithGoogle = () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
                /* .then((result) => {

                })
                .catch((error) => {

                }) */
        }

        //Nope you don't belong here check
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                window.location.href = '/home'
                //This is bugged right now
                //router.push("/home");
            }
        });

        return { 
            email, password, Signup, signInWithGoogle
        }
    }
}
</script>