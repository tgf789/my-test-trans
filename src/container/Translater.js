import React,{Component} from 'react';
import {Map,List} from 'immutable';
import {connect} from 'react-redux';
import * as actions from '../modules';

class Translater extends Component{


    
    handleSTChange = (e) => {
        this.props.onSourceTargetChange(e.target.id,e.target.value);
    }

    handleTyping = (e) => {
        this.props.onTyping(e.target.value);
    }

    render(){

        const {lang_arr,onTrans,source_text,target_text,selectedSource,selectedTarget} = this.props;

        const lang_select = lang_arr.map((val,i) => {
                return (<option value={i} >{val}</option>)
            })
        
        return(
            <p>
                소스 : 
            <select onChange={this.handleSTChange} id="source" value={selectedSource}>
                {lang_select}
            </select>
                
                번역 : 
            <select onChange={this.handleSTChange} id="target" value={selectedTarget}>
               {lang_select}
            </select>

                <div>
                    <input type="text" id="source_text" value={source_text} onChange={this.handleTyping}></input>
                    <input type="text" id="target_text" value={target_text} readOnly></input>
                </div>
                <input type="button" value="번역하기" onClick={onTrans}></input>
            
            </p>
        )
    }
}


const mapToStateProps = (state) => ({
    source_text : state.get('source_text'),
    target_text : state.get('target_text'),
    selectedSource : state.getIn(['lang','source']),
    selectedTarget : state.getIn(['lang','target']),
    lang_arr : state.get('lang_arr')
})

const mapDispatchProps = (dispatch) => ({
    onTrans : ()=> dispatch(actions.onTrans()),
    onTyping : (text)=> dispatch(actions.onTyping(text)),
    onSourceTargetChange : (left,value) => dispatch(actions.onSourceTargetChange(left,value))
})


export default connect(mapToStateProps,mapDispatchProps)(Translater);


