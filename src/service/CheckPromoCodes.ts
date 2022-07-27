import { IPromoCode } from "../types";

export default function CheckCodes(serverAllCodes: IPromoCode[], usersActivatedCodes: IPromoCode[]){
    let resultActualCodes = sortOldCodes(serverAllCodes.slice(0), serverAllCodes); // сортировка от просроченных кодов
    resultActualCodes.a = sortActivatedCodes(usersActivatedCodes, resultActualCodes.a); // сортировка активированых промокодов
    return { actualCodes: resultActualCodes.a, history: resultActualCodes.b.reverse() };
}

function sortActivatedCodes(a: IPromoCode[], b: IPromoCode[]){
    //сортировка активированых кодов
    a.forEach((value) => {
        b = b.filter((item) => item._id !== value._id);
    });
    return b;
}

export function sortOldCodes(a: IPromoCode[], b: IPromoCode[]){
    //сортировка от истёкших кодов
    const tempHistory: IPromoCode[] = [];

    b.forEach((value) => {
        if(Date.now() > value.expired){
            tempHistory.push(value);
            a = a.filter((item) => item._id !== value._id);
        }
    });

    return { a: a, b: tempHistory };
}