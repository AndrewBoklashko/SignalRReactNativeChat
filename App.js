import './shim';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import * as signalR from '@aspnet/signalr-client';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        message: 'No messages.'
    };
    this.messageReceived = this.messageReceived.bind(this);
    this.sendTestMessage = this.sendTestMessage.bind(this);

    const hubUrl = 'http://localhost:10922/chat';
    let transportType = signalR.TransportType.WebSockets;
    let logger = new signalR.ConsoleLogger(signalR.LogLevel.Information);
    let hubConnection = new signalR.HubConnection(hubUrl, { transport: transportType, logger: logger });

    hubConnection.on('Send', this.messageReceived);
    hubConnection.start().catch(err => this.logError(err));

    this.connection = hubConnection;
}

messageReceived(message) {
    this.setState({message});
}

sendTestMessage() {
    this.connection.invoke('Send', 'Test message from mobile app.').catch(err => this.logError(err));
} 

logError(err) {
    console.log(err);
}

render() {
    return (
        <View style={styles.container}>
            <View>
                <Text>{this.state.message}</Text>
            </View>
            <View>
                <Button onPress={this.sendTestMessage}>
                    Send test message
                </Button>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
