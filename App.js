import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // abrir el picker al tocar la imagen inicial y seleccionar imagen
  let openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to camara roll is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  // abrir el panel de aplicaciones para compartir al tocar el boton de compartir
  let openShareDialog = async () => {
    // verificando si el dispositivo puede compartir imagenes
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image share is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seleccione una imagen:</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://i.ibb.co/1LN0vsy/share.png",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      {selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.textoboton}>Compartir Imagen</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    color: "#61DBFB",
    fontSize: 25,
    marginBottom: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  button: { backgroundColor: "#61DBFB", padding: 7, marginTop: 30 },
  textoboton: { fontSize: 20, color: "#fff" },
  thumbnail: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
});

export default App;
