import {Map,List} from 'immutable'

const axios = require('axios');


export const TYPING = 'trans/TYPING';
export const TRANS = 'trans/TRANS';
export const SOURCE_TARGET_CHANGE = 'trans/SOURCE_TARGET_CHANGE';



export const onTyping = (text) => ({
    type: TYPING,
    text
})

export const onTrans = () => ({
    type: TRANS
}) 

export const onSourceTargetChange = (left,value) =>({
    type: SOURCE_TARGET_CHANGE,
    left,
    value
})



const initialState = Map({
    source_text : "",
    target_text : "",
    lang : Map({
        source : 'ko',
        target : 'en'
    }),
    lang_arr : Map({'ko':'한국어','en':'영어','ja':'일본어','zh-CN':'중국어(간체)','zh-TW':'중국어(번체)'})

})



function translate_source(text,source,target){
    console.log(text,source,target);
    axios({
        method: 'POST',
        url : 'https://openapi.naver.com/v1/language/translate',
        data : {
            'source' : source,
            'target': target,
            'text' : text
        },
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id' : 'i_tlgqeozyIboE0IgAzW',
            'X-Naver-Client-Secret' : ''
        }
    }).then((response)=>{
        console.log(response);
    }).catch((e)=>{
        console.log('err',e);
    })


}

function trans (state = initialState, action) {

    switch(action.type){

        case TYPING : 
            console.log('modules','TYPING');
            return state.set('source_text',action.text);

        case TRANS : 
            console.log('modules','TRANS');
            translate_source(state.get('source_text'),state.getIn(['lang','source']),state.getIn(['lang','target']));
            return state
        case SOURCE_TARGET_CHANGE :
            console.log('modules','SOURCE_TARGET_CHANGE');
            return state.setIn(['lang',action.left],action.value); 

        default :
            return state;
    }

} 


export default trans;