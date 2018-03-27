import React,{Component} from 'react';
import routes from './route/index'
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import inject from '@inject'

@inject([['user']])
export default class AppContainer extends Component {
    render() {
      const { store, history } = this.props;
        return (
        <Provider store={store}>
            <Router routes={routes} history={history} />
        </Provider>
      )
    }
  }
