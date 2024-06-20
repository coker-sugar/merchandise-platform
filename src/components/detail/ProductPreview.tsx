// 搭建商品预览组件
import { Flex, Skeleton } from "antd";
import { ProductProps } from '../../types/detail'

const ProductPreview: React.FC<ProductProps> = (preview) => {
    let isShow = false

    const skeleton = <Flex className="skeleton-content" vertical={true} justify="space-around">
        <h4 className="skeleton-title">{preview.description}</h4>
        <div className="skeleton-price skeleton-basic "> {preview.price} </div>
        <h4>{preview.name}</h4>
        <div className="skeleton-basic ">{preview.basic}</div>
    </Flex>

    if (!preview.picture) {
        isShow = true
    }
    return (
        <Flex vertical={true} className="skeleton">
            <div className="skeleton-img-container">
                {isShow ? <Skeleton.Image active className="skeleton-img" /> : <img src={preview.picture} alt="product" className="skeleton-img skeleton-animation " />}
            </div>
            {isShow ? <Skeleton active /> : skeleton}
        </Flex>
    )
}

export default ProductPreview;