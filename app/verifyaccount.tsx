import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "expo-router";
import axios from "axios";
import SecoundryButton from "@/components/SecoundryButton";

const verifyaccount = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerifyAccount = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit code.");
      return;
    }

    try {
      // 👇 Replace URL with your actual verify API endpoint
      const response = await axios.post(
         "https://yemiecom.infolaravel.news/api/v1/auth/verify-email",
        {
          email_or_phone: phone, // pass phone from previous step
          otp: enteredOtp,
        }
      );

      console.log("Verify Response:", response.data);

      if (response.data.status === true) {
        Alert.alert("Success", "Account verified successfully!");
        router.push("/loginscreen"); // ✅ go to login screen
      } else {
        Alert.alert("Failed", response.data.message || "Invalid OTP");
      }
    } catch (error: any) {
      console.error("Verify Error:", error.response?.data || error.message);
      if (error.response?.status === 429) {
        setModalVisible(true); // too many attempts
      } else {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Something went wrong"
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Svg style={styles.midShape} viewBox="0 0 200 200">
        <Path
          fill="#DCE6FF"
          d="M47.7,-62.7C62.6,-52.5,77.1,-39.5,83.4,-22.4C89.7,-5.2,87.7,16,75.4,27.9C63.1,39.8,40.5,42.4,21.3,50.6C2,58.9,-13.8,72.9,-30.7,72.8C-47.7,72.8,-65.8,58.8,-75.8,40.3C-85.8,21.7,-87.7,-1.4,-78.7,-18.7C-69.7,-36,-49.9,-47.6,-32.1,-58.1C-14.3,-68.6,1.4,-78,18.8,-80.4C36.2,-82.7,55.2,-77.3,47.7,-62.7Z"
          transform="translate(100 100) scale(-1,1)"
        />
      </Svg>

      <View style={styles.topShape}></View>

      <View style={styles.profileView}>
        <Image
          source={require("../assets/images/profile.png")}
          style={styles.profile}
        />
      </View>

      <Text style={styles.header}>Account Verification</Text>

      <View style={styles.textview}>
        <Text style={styles.passwordtext}>Enter 6-digits code we sent you</Text>
        <Text style={styles.passwordtext}>
          to your email to verify your Account
        </Text>
      </View>

      <Text style={styles.phone}>{phone ? phone : "+92*********72"}</Text>

      {/* ✅ OTP INPUTS */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      {/* <PrimaryButton title="Send Again" onPress={handleSendAgain} /> */}
      <PrimaryButton title="Verify" onPress={handleVerifyAccount} />
      <SecoundryButton title="Cancel" onPress={() => router.replace("/registerscreen")} />

      {/* ✅ Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
              Too Many Attempts
            </Text>
            <Text style={styles.message}>
              You reached out maximum{"\n"}amount of attempts.{"\n"}Please, try
              later.
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white" }}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default verifyaccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "white",
    gap: 8,
    alignItems: "center",
  },
  topShape: {
    position: "absolute",
    top: -100,
    right: -70,
    width: 270,
    height: 270,
    backgroundColor: "#FA8232",
    borderBottomLeftRadius: 220,
    borderTopLeftRadius: 250,
    borderBottomRightRadius: 220,
  },
  midShape: {
    position: "absolute",
    width: 300,
    height: 300,
    top: -70,
    right: -25,
  },
  profile: {
    height: 100,
    width: 100,
  },
  profileView: {
    height: 110,
    width: 110,
    borderWidth: 10,
    borderColor: "white",
    borderRadius: 60,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textview: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontFamily: "Raleway",
    color: "#202020",
    fontWeight: "700",
    fontSize: 21,
    marginBottom: 10,
  },
  passwordtext: {
    fontFamily: "Nunito Sans",
    color: "#202020",
    fontSize: 12,
    fontWeight: "300",
  },
  phone: {
    fontWeight: "700",
    color: "#000000",
    fontFamily: "Nunito Sans",
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 150,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#F5F5F5",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  closeButton: {
    backgroundColor: "#202020",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 12,
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    color: "#202020",
    marginBottom: 20,
  },
});
