import {createSelector} from 'reselect'

// const COLLECTION_ID_MAP = {
//     hats : 1,
//     sneakers : 2,
//     jackets : 3,
//     womens : 4,
//     mens : 5
// }

const selectShop = state => state.shop 

export const selectShopCollections = createSelector (
    [selectShop],
    shop => shop.collections
)

export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
    // collections => Object.keys(collections).map(key => collections[key])
)

export const selectShopCollection = collectionUrlParam => 
    createSelector(
        [selectShopCollections],
        collections => collections ? collections[collectionUrlParam] : null
        // collections => collections[collectionUrlParam]
    )

export const selectShopCollectionFetching = createSelector(
    [selectShop],
    shop=> shop.isFetching
)

export const selectShopCollectionLoading = createSelector(
    [selectShop],
    shop => !!shop.collections
)