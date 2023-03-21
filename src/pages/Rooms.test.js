import {render,screen} from '@testing-library/vue'
import Rooms from './Rooms.vue'

describe('Rooms page component testing',()=>{
    test('is Rooms page rendered',()=>{
        render(Rooms)
        expect(screen.getByTestId('rooms-page'))
    })
})