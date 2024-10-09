
import React from 'react';
import { StyleSheet, Text, View } from'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type checkboxPropsType = {
    label : string,
    checkedStatus: boolean,
    updateCheckedStatus : (isChecked:boolean) =>void,
    labelColor:string,
};

function FormCheckBox(props:checkboxPropsType):React.JSX.Element{

    const checkedStatus = props.checkedStatus;
    const updateCheckedStatus = props.updateCheckedStatus;
    const labelText = props.label;
    const labelColor = props.labelColor;

    return(
        //accept at least an id, label string, and checkbox color as props
        <View>
            <View style={style.checkboxContainer}>
            <BouncyCheckbox
                isChecked={checkedStatus}
                size={25}
                fillColor={labelColor}
                unFillColor="#FFFFFF"
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                onPress={(isChecked: boolean) => {console.log(isChecked);
                    updateCheckedStatus(isChecked);
                }}
                />
                <Text style={style.checkboxText}>{labelText}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    checkboxContainer:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:5,
    },
    checkboxText:{
        fontSize:25,
        fontWeight:'600',
    },
});


export default FormCheckBox;
