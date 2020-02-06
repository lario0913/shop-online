import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import withSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPage from '../collection/collection.component'
import {selectShopCollectionLoading} from '../../redux/shop/shop.selectors'


const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectShopCollectionLoading(state)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionPage)

export default CollectionPageContainer