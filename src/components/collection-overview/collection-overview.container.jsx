import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import withSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionOverview from '../../components/collection-overview/collection-overview.components'
import {selectShopCollectionFetching} from '../../redux/shop/shop.selectors'


const mapStateToProps = createStructuredSelector({
    isLoading: selectShopCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionOverview)

export default CollectionOverviewContainer