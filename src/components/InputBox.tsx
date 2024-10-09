import React from 'react';
import { StyleSheet, TextInput, View } from'react-native';

type InputBoxPropsType = {
    inputVal: string;
    updateInputVal: (val:string) =>void
    inputPlaceHolderTxt:string;
}

function InputBox(props:InputBoxPropsType):React.JSX.Element{

    const inputVal = props.inputVal;
    const updateInputVal = props.updateInputVal;
    const inputPlaceHolderTxt = props.inputPlaceHolderTxt;

    return(
        //accept only 2 character from user
        <View>
            <TextInput
            style={style.inputBox}
            value={inputVal}
            placeholder={inputPlaceHolderTxt}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={updateInputVal}/>
        </View>
    );
}

//8-16 conditional choose

const style = StyleSheet.create({

    inputBox:{
        borderColor:'black',
        borderWidth:2,
        margin:20,
        borderRadius:10,
        padding:10,
    },
});

export default InputBox;
