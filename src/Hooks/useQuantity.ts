
import { useState } from "react";

const useQuantity = (
    stock: number,
    initialQuantity: number = 1
) => {
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const [previousInitialQuantity, setPreviousInitialQuantity] =
        useState(initialQuantity);

    if (previousInitialQuantity !== initialQuantity) {
        setPreviousInitialQuantity(initialQuantity);
        setQuantity(initialQuantity);
    }

    const increase = () => {
        setQuantity((quantity) =>
            quantity < stock ? quantity + 1 : quantity
        );
    };

    const decrease = () => {
        setQuantity((quantity) =>
            quantity > 1 ? quantity - 1 : 1
        );
    };

    return {
        quantity,
        increase,
        decrease,
        canIncrease: quantity < stock,
        canDecrease: quantity > 1,
    };
};

export default useQuantity;
