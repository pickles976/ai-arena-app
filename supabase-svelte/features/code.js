import { supabase } from '../src/supabaseClient'

/**
 * Get the code for a given user
 */
export async function getCode() {
        
    let { data: TacticalCode, error } = await supabase
    .from('TacticalCode')
    .select('*')
    .eq('name', 'Second Code')

    console.log(TacticalCode)
}