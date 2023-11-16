import {CODE39} from './CODE39/index';
import {CODE128, CODE128A, CODE128B, CODE128C} from './CODE128/index';
import {EAN13, EAN8, EAN5, EAN2, UPC, UPCE} from './EAN_UPC/index';
import {ITF, ITF14} from './ITF/index';
import {MSI, MSI10, MSI11, MSI1010, MSI1110} from './MSI/index';
import {pharmacode} from './pharmacode/index';
import {codabar} from './codabar/index';
import {GenericBarcode} from './GenericBarcode/index';

export default {
	CODE39,
	CODE128, CODE128A, CODE128B, CODE128C,
	EAN13, EAN8, EAN5, EAN2, UPC, UPCE,
	ITF14,
	ITF,
	MSI, MSI10, MSI11, MSI1010, MSI1110,
	pharmacode,
	codabar,
	GenericBarcode
};
