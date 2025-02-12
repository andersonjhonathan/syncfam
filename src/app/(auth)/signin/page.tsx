import { useState } from 'react';
import colors from '@/constants/colors';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { router } from 'expo-router'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignIn(){
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error){
            Alert.alert('Error', error.message)
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(painel)/profile/page')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>
                    Dhyz<Text style={{ color: colors.green }}>App</Text>
                </Text>
                <Text style={styles.slogan}>
                    O Futuro da programação
                </Text>
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder='Digite seu Email...'
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder='Digite sua senha...'
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Pressable style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>
                            {loading ? 'Carregando...' : 'Entrar'}
                        </Text>
                    </Pressable>

                    <Link href='/(auth)/signup/page' style={styles.link}>
                        <Text>Ainda não possui uma conta? Cadastre-se</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.zinc
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    slogan: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34,
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14
    },
    label: {
        color: colors.zinc,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    },
    button: {
        backgroundColor: colors.green,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
    },
    buttonText: {
        color: colors.zinc,
        fontWeight: 'bold'
    },
    link: {
        marginTop: 16,
        textAlign: 'center'
    }
})