import {render,screen} from '@testing-library/vue'
import Home from './Home.vue'
import { describe, expect, test } from 'vitest'

describe('Home page component testing',()=>{
    test('are present page data',()=>{
        render(Home)
        expect(screen.getByText(/home/i))
    })
})