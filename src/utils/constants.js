// this array determines order
export const sections = [
  { display: 'What is it?', key: 'what_is_it', icon: 'description' },
  { display: 'Symptoms', key: 'symptoms', icon: 'healing' },
  { display: 'Key Benefits', key: 'key_benefits', icon: 'vpn_key' },
  { display: 'Side Effects', key: 'side_effects', icon: 'flash_on' },
  { display: 'How to Wear', key: 'how_to_wear', icon: 'lightbulb_outline' },
  { display: 'Who Can Use', key: 'who_can_use', icon: 'face' },
];

// helper fn
export const updateBodyClr = color => {
  document.body.style.background = color;
};
