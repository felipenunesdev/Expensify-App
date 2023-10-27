import {SvgProps} from 'react-native-svg';

type Timezone = {
    /** Value of selected timezone */
    selected?: string;

    /** Whether timezone is automatically set */
    automatic?: boolean;
};

type PersonalDetails = {
    /** ID of the current user from their personal details */
    accountID: number;

    /** First name of the current user from their personal details */
    firstName?: string;

    /** Last name of the current user from their personal details */
    lastName?: string;

    /** Display name of the current user from their personal details */
    displayName: string;

    /** Is current user validated */
    validated?: boolean;

    /** Phone number of the current user from their personal details   */
    phoneNumber?: string;

    /** Avatar URL of the current user from their personal details */
    avatar: string | React.FC<SvgProps>;

    /** Flag to set when Avatar uploading */
    avatarUploading?: boolean;

    /** Login of the current user from their personal details */
    login?: string;

    /** Pronouns of the current user from their personal details */
    pronouns?: string;

    /** Local currency for the user */
    localCurrencyCode?: string;

    /** Timezone of the current user from their personal details */
    timezone?: Timezone;

    /** Flag for checking if data is from optimistic data */
    isOptimisticPersonalDetail?: boolean;

    fallbackIcon?: string;

    /** Status of the current user from their personal details */
    status?: string;
};

export type {Timezone};

export default PersonalDetails;
