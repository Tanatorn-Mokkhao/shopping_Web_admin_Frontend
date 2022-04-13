import React from 'react'
import { useSelector }  from 'react-redux'
import LoaderTempleate from './loader.template'
function Loader() {
    const auth = useSelector((state) => state.auth)
    const category = useSelector((state) => state.category)
    const product = useSelector((state) => state.product)
    const order = useSelector((state) => state.order )
    return (
        <>
            {auth.loading ? <LoaderTempleate /> : null}
            {category.loading ? <LoaderTempleate /> : null}
            {product.loading ? <LoaderTempleate /> : null}
            {order.loading ? <LoaderTempleate /> : null }
        </>
    )
}

export default Loader
