import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface InfoUser {
	id: number;
	email: string;
	password: string;
	role: number;
	createDate: string;
	refresh_token: string;
	permissionManager: [];

}

interface AccountState {
	data: InfoUser[] | [];
	isLoading: Boolean | false;
	isError: string | null;
}

const initialState: AccountState = {
	data: [],
	isLoading:  false,
	isError:  null,
};

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		initAccount: (state, action: PayloadAction<any>) => {
			state.data = action?.payload;
		},
		updatePermissionList: (state, action: PayloadAction<{ newItem: { id: number; permissionList: [] } }>) => {
			const { id } = action.payload.newItem;
			

			// Use findIndex to get the index of the account to update
			const accountToUpdateIndex = state.data.findIndex((account) => account.id === id);

			console.log(accountToUpdateIndex);

			if (accountToUpdateIndex !== -1) {
				// Update the entire 'InfoUser' object with the new item
				state.data[accountToUpdateIndex] = { ...state.data[accountToUpdateIndex], ...action.payload.newItem };
			}
		},
		 deleteAccount: (state, action: PayloadAction<number>) => {
			const idToDelete = action.payload;

			// Use filter to create a new array without the account to be deleted
			state.data = state.data.filter((account) => account.id !== idToDelete);
		},

	}

});

// Action creators are generated for each case reducer function
export const {initAccount, updatePermissionList, deleteAccount} = accountSlice.actions;
export default accountSlice.reducer;
