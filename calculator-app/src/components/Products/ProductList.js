import React from 'react'
import {List } from 'semantic-ui-react'
import {AddButton} from "./AddButton";
import {RemoveButton} from "./RemoveButton";
import item1 from '../../images/castle.jpg';

const ListExampleFloated = () => (
    <List divided verticalAlign='middle'>
        <List.Item>
            <List.Content floated='right'>
                <AddButton>Add</AddButton>
                <RemoveButton>Remove</RemoveButton>
            </List.Content>
            <img src={require('../../images/castle.jpg').default} alt="image not found" height={64} width={48}/>
            <List.Content>Castle In The Sky</List.Content>
        </List.Item>
        <List.Item>
            <List.Content floated='right'>
                <AddButton>Add</AddButton>
                <RemoveButton>Remove</RemoveButton>
            </List.Content>
            <img src={require('../../images/pom poko.jpg').default} alt="image not found" height={64} width={48}/>
            <List.Content>Pom Poko</List.Content>
        </List.Item>
        <List.Item>
            <List.Content floated='right'>
                <AddButton>Add</AddButton>
                <RemoveButton>Remove</RemoveButton>
            </List.Content>
            <img src={require('../../images/spirited away.jpg').default} alt="image not found" height={64} width={48}/>
            <List.Content>Spirited Away</List.Content>
        </List.Item>
        <List.Item>
            <List.Content floated='right'>
                <AddButton>Add</AddButton>
                <RemoveButton>Remove</RemoveButton>
            </List.Content>
            <img src={require('../../images/porco rosso.jpg').default} alt="image not found" height={64} width={48}/>
            <List.Content>Porco Rosso</List.Content>
        </List.Item>
    </List>
)

export default ListExampleFloated