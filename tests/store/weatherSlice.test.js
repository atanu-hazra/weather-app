import weatherReducer, { setCurrentWeatherData, setMultipleWeatherData } from '../../src/store/weatherSlice';

/**
 * LESSON 10: Unit Testing Redux Slices & Reducers
 * - Redux Toolkit reducers are **pure functions**. This means given the same input, they always return the same output without modifying global state.
 * - Because they are pure, we don't need React Testing Library or `render` utilities to test them!
 * - We can simply call the reducer function with an initial state and an action creator, and check if the returned new state matches our expectations.
 */
describe('Weather Redux Slice Reducer', () => {

    const initialState = {
        currentWeatherData: {},
        multipleWeatherData: []
    };

    test('should return the initial state when passed an empty/unknown action', () => {
        // We pass undefined state and empty action to check if the reducer initializes state correctly.
        const state = weatherReducer(undefined, { type: '@@INIT' });
        
        expect(state).toEqual(initialState);
    });

    test('should handle setCurrentWeatherData action and update currentWeatherData state', () => {
        const mockData = {
            location: { name: 'Kolkata' },
            current: { temp_c: 32 }
        };

        // Call reducer function with current state and action creator payload
        const nextState = weatherReducer(initialState, setCurrentWeatherData(mockData));

        // Assert that the state field was correctly mutated
        expect(nextState.currentWeatherData).toEqual(mockData);
        
        // Assert other state fields are untouched
        expect(nextState.multipleWeatherData).toEqual([]);
    });

    test('should handle setMultipleWeatherData action and update multipleWeatherData state', () => {
        const mockList = [
            { location: { name: 'Kolkata' }, current: { temp_c: 32 } },
            { location: { name: 'Paris' }, current: { temp_c: 12 } }
        ];

        // Call reducer
        const nextState = weatherReducer(initialState, setMultipleWeatherData(mockList));

        // Assert updated list
        expect(nextState.multipleWeatherData).toEqual(mockList);

        // Assert currentWeatherData is untouched
        expect(nextState.currentWeatherData).toEqual({});
    });
});
