
import SecoundryButton from "@/components/SecoundryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const forgetpassword = ({ navigation }: any) => {

    return (

        <View style={styles.container} >


            <Svg style={styles.midShape}
                viewBox="0 0 200 200">
                <Path
                    fill="#DCE6FF" // Light blue shape
                    d="M47.7,-62.7C62.6,-52.5,77.1,-39.5,83.4,-22.4C89.7,-5.2,87.7,16,75.4,27.9C63.1,39.8,40.5,42.4,21.3,50.6C2,58.9,-13.8,72.9,-30.7,72.8C-47.7,72.8,-65.8,58.8,-75.8,40.3C-85.8,21.7,-87.7,-1.4,-78.7,-18.7C-69.7,-36,-49.9,-47.6,-32.1,-58.1C-14.3,-68.6,1.4,-78,18.8,-80.4C36.2,-82.7,55.2,-77.3,47.7,-62.7Z"
                    transform="translate(100 100)"
                />
            </Svg>
            <Svg
                style={styles.topShape}
                viewBox="0 0 200 200"
            >

                <View style={styles.topShape}></View>

            </Svg>

            <View style={styles.profileView}>

                <Image source={require('../assets/images/profile.png')}
                    style={styles.profile}
                />

            </View>

            <View style={styles.textview}>
                <Text style={styles.username}>Hello, Romina!!</Text>
                <Text style={styles.passwordtext}>Type your password</Text>
            </View>

            <View style={styles.cardsview}>


                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
                
                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
                <Image
                    source={require('../assets/images/ellispseorange.png')}
                    style={styles.ellips}
                />
            </View>

            <View style={styles.buttonview}>
                <SecoundryButton title=" Forgot your password?"

                    onPress={() => router.replace("/recoverpassword")}

                />


                <Image
                    source={require('../assets/images/Button.png')}
                    style={styles.buttonicon}
                />

            </View>


        </View>
    );
};

export default forgetpassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: 'white',
        gap: 8,
        alignItems: 'center'
    },
    topShape: {
        position: "absolute",
        top: -100,
        left: -70,
        width: 270,
        height: 270,
        backgroundColor: '#FA8232',
        borderBottomRightRadius: 220,
        borderTopRightRadius: 250,
        borderBottomLeftRadius: 220
    },
    midShape: {
        position: "absolute",
        width: 300,
        height: 350,
        top: -70,
        left: -25
    },


    profile: {
        height: 100,
        width: 100,

    },
    profileView: {
        height: 110,
        width: 110,
        borderWidth: 10,
        borderColor: 'white',
        borderRadius: 60,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    textview: {
        gap: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20

    },
    username: {
        fontFamily: 'Raleway',
        color: '#202020',
        fontWeight: '700',
        fontSize: 28,
    },
    passwordtext: {
        fontFamily: 'Nunito Sans',
        color: '#202020',
        fontSize: 10,
        fontWeight: '300',


    },
    cardsview: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30

    },

    ellips: {

        height: 20,
        width: 20
    },
    buttonicon: {
        height: 20,
        width: 20,
        marginTop: 10,
    },
 
    buttonview: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: 8,
        alignSelf: 'center'
    }
});

