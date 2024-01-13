import { View } from "react-native";
import Button from "./Button";
import * as ImagePicker from "expo-image-picker";
import Avatar from "./Avatar";

export default function ImagePickerComponent({ image, onUpdate }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      onUpdate(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    onUpdate(null);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
      <Avatar image={image} />
      <Button rounded onPress={pickImage}>
        {image ? "Change" : "Add avatar"}
      </Button>
      {image && (
        <Button outlined onPress={deleteImage}>
          Remove
        </Button>
      )}
    </View>
  );
}
