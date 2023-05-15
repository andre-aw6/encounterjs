import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import config from '../config';

const names = {
    'handbag': 'archive',
    'user': 'user',
    'magnifier': 'search',
    'home': 'home',
    'question': 'question',
    'settings': 'gear',
    'credit-card': 'credit-card',
    'location-pin': 'location',
    'tag': 'tag',
    'bell': 'bell',
}

export default ({ name, ...props}) => {

    if(!config.simpleLineIcons && names[name]){
          if(names[name] == 'home')   
            return <SimpleLineIcons name={name} {...props} size={Math.floor(props.size * 1.1)}/>
        
          return <EvilIcons name={names[name]} {...props} size={Math.floor(props.size * 1.6)} />
    }
    
    
    return <SimpleLineIcons name={name} {...props}/>
}