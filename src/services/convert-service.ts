import axios from 'axios';
import { CantorValues } from 'src/components/ConverterForm/ConverterForm.types';

const API_URL = 'https://my.transfergo.com/api/fx-rates';

export interface ApiResponse {
  from: string;
  fromAmount: number;
  rate: number;
  to: string;
  toAmount: number;
}

class ConvertService {
  async getConvertedAmount({ from, to, amount }: CantorValues): Promise<ApiResponse | undefined> {
    const res = await axios.get(API_URL + `?from=${from}&to=${to}&amount=${amount}`);

    if (!res) return undefined;

    return res.data;
  }
}

const convertService = new ConvertService();
export default convertService;
