import Onyx from 'react-native-onyx';
import getPlaidLinkTokenParameters from '../getPlaidLinkTokenParameters';
import ONYXKEYS from '../../ONYXKEYS';
import * as API from '../API';
import * as PlaidDataProps from '../../pages/ReimbursementAccount/plaidDataPropTypes';

/**
 * Gets the Plaid Link token used to initialize the Plaid SDK
 */
function openPlaidBankLogin(allowDebit: boolean, bankAccountID: number) {
    // redirect_uri needs to be in kebab case convention because that's how it's passed to the backend
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {redirect_uri} = getPlaidLinkTokenParameters();
    const params = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        redirect_uri,
        allowDebit,
        bankAccountID,
    };
    const optimisticData = [
        {
            onyxMethod: Onyx.METHOD.SET,
            key: ONYXKEYS.PLAID_DATA,
            value: {...PlaidDataProps.plaidDataDefaultProps, isLoading: true},
        },
        {
            onyxMethod: Onyx.METHOD.SET,
            key: ONYXKEYS.PLAID_LINK_TOKEN,
            value: '',
        },
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.REIMBURSEMENT_ACCOUNT_DRAFT,
            value: {
                plaidAccountID: '',
            },
        },
    ];

    API.read('OpenPlaidBankLogin', params, {optimisticData});
}

function openPlaidBankAccountSelector(publicToken: string, bankName: string, allowDebit: boolean, bankAccountID: number) {
    API.read(
        'OpenPlaidBankAccountSelector',
        {
            publicToken,
            allowDebit,
            bank: bankName,
            bankAccountID,
        },
        {
            optimisticData: [
                {
                    onyxMethod: Onyx.METHOD.MERGE,
                    key: ONYXKEYS.PLAID_DATA,
                    value: {
                        isLoading: true,
                        errors: null,
                        bankName,
                    },
                },
            ],
            successData: [
                {
                    onyxMethod: Onyx.METHOD.MERGE,
                    key: ONYXKEYS.PLAID_DATA,
                    value: {
                        isLoading: false,
                        errors: null,
                    },
                },
            ],
            failureData: [
                {
                    onyxMethod: Onyx.METHOD.MERGE,
                    key: ONYXKEYS.PLAID_DATA,
                    value: {
                        isLoading: false,
                    },
                },
            ],
        },
    );
}

export {openPlaidBankAccountSelector, openPlaidBankLogin};
