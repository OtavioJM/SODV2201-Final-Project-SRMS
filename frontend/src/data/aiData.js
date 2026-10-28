// Dataset for the simulated AI assistant.
// If the message has one of the keywords, the assistant gives that answer.
export const aiData = [
  {
    question: "What are today's specials?",
    keywords: ['special', 'deal'],
    answer: "Today's special is Chicken Alfredo for $18.99.",
  },
  {
    question: 'What vegetarian meals do you have?',
    keywords: ['vegetarian', 'veggie', 'no meat'],
    answer: 'We offer Vegetable Pasta, Margherita Pizza, and Garden Salad.',
  },
  {
    question: 'What do you recommend?',
    keywords: ['recommend', 'suggest', 'should i'],
    answer: 'Based on popular orders, we recommend our Chicken Alfredo.',
  },
  {
    question: 'Do you have gluten-free options?',
    keywords: ['gluten', 'celiac'],
    answer: 'Yes. We offer gluten-free pasta and selected salads.',
  },
  {
    question: 'What is the most popular dessert?',
    keywords: ['dessert', 'sweet', 'cake'],
    answer: 'Our Chocolate Lava Cake is our most popular dessert.',
  },
  {
    question: 'What did I order last time?',
    keywords: ['last time', 'last order', 'previous', 'ordered'],
    answer: 'Your previous order was Chicken Alfredo and Chocolate Lava Cake.',
  },
]

export const defaultAnswer =
  "Sorry, I don't know that one yet. You can ask me about specials, vegetarian or gluten-free meals, desserts or your last order."
