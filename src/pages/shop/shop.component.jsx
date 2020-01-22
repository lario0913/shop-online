import React from 'react'
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'
import {updateCollections} from '../../redux/shop/shop.action'

import withSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionOverview from '../../components/collection-overview/collection-overview.components'
import CollectionPage from '../collection/collection.component'
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'

const CollectionPageWithSpinner = withSpinner(CollectionPage)
const CollectionOverviewWithSpinner = withSpinner(CollectionOverview)

class ShopPage extends React.Component {
    state = {
        loading : true
    }

    unSubsrcibeFromSnapshot = null

    componentDidMount(){
        const {updateCollections} = this.props;

        const collectionRef = firestore.collection('collections')

        //whenevr it updats or gets run for the first time 
        this.unSubsrcibeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionSnapshotToMap(snapshot)
            updateCollections(collectionMap)
            this.setState({loading:false})
        })
    }

    render(){
        const {match} = this.props
        const {loading} = this.state
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> }  />

                {/* <Route exact path={`${match.path}`} component={CollectionOverview}/> */}

                <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />         

                {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} />  */}
            </div>
        )
    }

}

const matchDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, matchDispatchToProps)(ShopPage)
