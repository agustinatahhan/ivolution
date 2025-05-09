import { Colors } from '@/constants/Colors';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import Logo from '../../assets/images/logo.png';

export default function LoginScreen() {
  const { width: windowWidth } = useWindowDimensions();

  if (windowWidth === 0) {
    return null;
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log("Datos enviados:", data);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.formContainer, { width: windowWidth > 600 ? '40%' : '100%' }]}>
        {/* <Text style={styles.logo}>IVOLUTION TRAINER</Text> */}
        <Image source={Logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.label}>Correo electrónico o usuario</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "El email es obligatorio",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email inválido"
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="anonimo@gmail.com"
              placeholderTextColor={Colors.text.inhabilitado}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Text style={styles.label}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "La contraseña es obligatoria" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={Colors.text.inhabilitado}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? Colors.button.primary : '#007AFF' },
            !isValid && { backgroundColor: Colors.button.inactive },
            isValid && { cursor: 'pointer' }
          ]}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </Pressable>

        <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
        <Text style={styles.footer}>
          * Debes iniciar sesión con tu cuenta de <Text style={{ fontWeight: 'bold' }}>IVOLUTION ANALYTICS</Text>
        </Text>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center', // Centra todo horizontalmente
    padding: 20,
  },
  formContainer: {
    // Esto se ajusta dinámicamente con width en el componente
    alignItems: 'stretch', // Los hijos toman el ancho total
  },
  logo: {
    width: 256,
    height: 76,
    marginBottom: 68,
    alignSelf: 'center', 
    },

  label: {
    color: Colors.text.blanco,
    marginBottom: 8,
    textAlign: 'left', // 👈 Esto alinea las labels a la izquierda
  },
  input: {
    backgroundColor: Colors.text.blanco,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    height: 40,
  },
  error: {
    color: Colors.text.blanco,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
    width: 156,
    height: 48
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    color: Colors.button.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  footer: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
});
